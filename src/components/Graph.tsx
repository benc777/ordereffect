import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { models } from "../data/models";
import { tags } from "../data/tags";
import { graphEdges } from "../data/graph";
import { useLibraryStore } from "../hooks/useLibraryStore";

interface GraphNode {
  id: string;
  type: "model" | "tag";
  label: string;
  tldr?: string;
}

export function KnowledgeGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { openModel } = useLibraryStore((state) => ({ openModel: state.openModel }));

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const nodes: GraphNode[] = [
      ...models.map((model) => ({
        id: model.id,
        type: "model" as const,
        label: model.name,
        tldr: model.tldr
      })),
      ...tags.map((tag) => ({ id: tag.id, type: "tag" as const, label: tag.name }))
    ];

    const validEdges = graphEdges.filter((edge) =>
      nodes.find((node) => node.id === edge.source) && nodes.find((node) => node.id === edge.target)
    );

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(validEdges as any).id((d: any) => d.id).distance(140))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const link = svg
      .append("g")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(validEdges)
      .join("line")
      .attr("stroke-width", 1.2);

    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("r", (d) => (d.type === "model" ? 14 : 10))
      .attr("fill", (d) => (d.type === "model" ? "#6E59A5" : "#1e293b"))
      .attr("stroke", "#64748b")
      .attr("stroke-width", 1.2)
      .style("cursor", (d) => (d.type === "model" ? "pointer" : "default"))
      .on("click", (_, d) => {
        if (d.type === "model") openModel(d.id);
      });

    node
      .append("text")
      .text((d) => d.label)
      .attr("x", 18)
      .attr("y", 4)
      .attr("fill", "#cbd5f5")
      .attr("font-size", 12);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as any).x)
        .attr("y1", (d) => (d.source as any).y)
        .attr("x2", (d) => (d.target as any).x)
        .attr("y2", (d) => (d.target as any).y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [openModel]);

  return <svg ref={svgRef} className="h-full w-full" role="img" aria-label="Mental models graph" />;
}

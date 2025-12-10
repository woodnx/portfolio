import yaml from "js-yaml";
import raw from "./chronicles.yaml?raw";

export interface Chronicle {
  title: string;
  category: string;
  date: string;
  description?: string;
  relation?: string[];
}

function isChronicle(obj: any): obj is Chronicle {
  return (
    typeof obj === "object" &&
    typeof obj.title === "string" &&
    typeof obj.category === "string" &&
    typeof obj.date === "string" &&
    (obj.description === undefined || typeof obj.description === "string") &&
    (obj.relation === undefined ||
      (Array.isArray(obj.relation) &&
        obj.relation.every((r: any) => typeof r === "string")))
  );
}

const loaded = yaml.safeLoad(raw);
if (!Array.isArray(loaded) || !loaded.every(isChronicle)) {
  throw new Error("Invalid chronicles data structure");
}
export const chronicles = loaded as Chronicle[];

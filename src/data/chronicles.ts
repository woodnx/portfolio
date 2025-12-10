import yaml from "js-yaml";
import raw from "./chronicles.yaml?raw";

export interface Chronicle {
  title: string;
  category: string;
  date: string;
  description?: string;
  relation?: string[];
}

export const chronicles = yaml.load(raw) as Chronicle[];

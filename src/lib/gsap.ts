"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const EASE = "power3.out";
export const FARA_MISCARE = "(prefers-reduced-motion: reduce)";
export const CU_MISCARE = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };

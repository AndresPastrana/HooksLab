"use client";

import { Share2Icon } from "lucide-react";
import React from "react";

const Share = ({ name }: { name: string }) => {
  const handle_share = () => {
    navigator.clipboard.writeText(`${window.location.origin}/?q=${name}`);
  };
  return <Share2Icon onClick={handle_share} className="h-4 w-4" />;
};

export default Share;

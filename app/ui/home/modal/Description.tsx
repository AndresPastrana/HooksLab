// import { DialogDescription } from "@ui/shared/dialog";

import { useActiveHook } from "@/app/hooks/app.hooks";

export const Description = () => {
  const { active } = useActiveHook();
  return (
    // <DialogDescription className="text-blue-300">
    //   {"Description"}
    // </DialogDescription>
    <h1>{active?.desc}</h1>
  );
};

import { useEffect } from "react";

export function TempoInit() {
  useEffect(() => {
    const init = async () => {
      if (process.env.REACT_APP_TEMPO) {
        const { TempoDevtools } = await import("tempo-devtools");
        TempoDevtools.init();
      }
    };

    init();
  }, []);

  return null;
}

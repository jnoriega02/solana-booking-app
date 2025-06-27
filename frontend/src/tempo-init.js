import { useEffect } from "react";

export function TempoInit() {
  useEffect(() => {
    const init = async () => {
      // Initialize Tempo devtools in development
      if (
        process.env.NODE_ENV === "development" ||
        process.env.REACT_APP_TEMPO
      ) {
        try {
          const { TempoDevtools } = await import("tempo-devtools");
          TempoDevtools.init();
          console.log("Tempo devtools initialized");
        } catch (error) {
          console.warn("Failed to initialize Tempo devtools:", error);
        }
      }
    };

    init();
  }, []);

  return null;
}

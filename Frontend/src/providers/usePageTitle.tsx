import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Health Net`;
  }, [title]);
};

export default usePageTitle;

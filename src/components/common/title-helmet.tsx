import { Helmet } from "react-helmet";

export const TitleHelmet: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

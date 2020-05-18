import React from "react";
import { AddonPanel } from "@storybook/components";
import { addons, types } from "@storybook/addons";
import { useParameter, useStorybookState } from "@storybook/api";
import { styled } from "@storybook/theming";

const getUrl = (input) => {
  return typeof input === "string" ? input : input.url;
};

const Iframe = styled.iframe({
  width: "100%",
  height: "100%",
  border: "0 none",
});
const Img = styled.img({
  width: "100%",
  height: "100%",
  border: "0 none",
  objectFit: "contain",
});

const Asset = ({ url }) => {
  if (!url) {
    return null;
  }
  if (url.match(/\.(png|gif|jpeg|tiff|svg|anpg|webp)/)) {
    // do image viewer
    return <Img alt="" src={url} />;
  }

  return <Iframe title={url} src={url} />;
};

const Content = () => {
  const results = useParameter("assets", []); // story's parameter being retrieved here
  const { storyId } = useStorybookState();

  if (results.length === 0) {
    return null;
  }

  const url = getUrl(results[0]).replace("{id}", storyId);
  return (
    <>
      <Asset url={url} />
    </>
  );
};

addons.register("my/design-addon", () => {
  addons.add("design-addon/panel", {
    title: "assets",
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Content />
      </AddonPanel>
    ),
  });
});

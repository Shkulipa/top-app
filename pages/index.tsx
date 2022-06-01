import { GetStaticProps } from "next";
import { useState } from "react";
import {Htag, Button, P, Tag, Rating, Input, Textarea } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";
import Error from 'next/error';

function Home({ menu }: HomePages): JSX.Element {
  const [rating, setRating] = useState<number>(0);

  const isError = false;
  if(isError) return <Error statusCode={404} />;

  return (
    <>
      <P size="l">Text</P>
      <P size="m">Text</P>
      <P size="s">Text</P>
      <Htag tag='h1'>Text</Htag>
      <Button appearance='primary' arrow = 'down'>Text</Button>
      <Button appearance='ghost'>Text</Button>
      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>Red</Tag>
      <Tag size='s' color='green'>green</Tag>
      <Tag color='primary'>primary</Tag>
      <Rating rating={2} />
      <Rating rating={rating} setRating={setRating} isEditable />
      <Input placeholder="test" />
      <Textarea placeholder="test" />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomePages> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, 
  {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    },
  };
};

interface HomePages extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
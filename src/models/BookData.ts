export type Spine = {
  text: string;
  color: string;
  width: string;
  fontSize: string;
  fontFamily: string;
  textColor: string;
  fontWeight: string;
  textShadow: string;
  marginTitle: string;
  marginTop: string;
};

export type BookData = {
  title: string;
  cover: string;
  height: string;
  width: string;
  spine: Spine;
  link: string;
  tag: string;
};

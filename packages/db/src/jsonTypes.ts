export interface Contact {
  phone: string;
  email: string;
  address: string;
}

export interface Skills {
  name: string;
}

export interface Project {
  url: string;
}

export interface Social {
  name: string;
  url: string;
}

export interface Experience {
  role: string;
  company: string;
  year: string;
  desc: string;
}

export interface Education {
  university: string;
  year: string;
  degree: string;
}

export interface FontSize {
  fontSize: number;
  lineHeight: number;
  color: string;
}

export interface FontFamily {
  fontFamily: string;
}

export interface Body extends FontFamily {
  background: string;
}

export interface Title extends FontSize, FontFamily {
  textTransform: string;
  letterSpacing: number;
  [key: string]: any;
}

export interface Text extends FontSize {
  lineHeight: number;
  fontSize: number;
}

export interface TextMuted extends FontSize {}

export interface SubTitle extends FontSize {
  textTransform: string;
}

export interface Link extends FontSize {}

export interface Photo {
  width: number;
  height: number;
  borderRadius: number;
}

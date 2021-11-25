export const REGEX_SPECIAL_CHARACTER = /[!#$%^&*()!~`:\,\+]/;
export const REGEX_EMAIL =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.){1,2}([a-zA-Z]{2,4})$/;

export const REGEX_PASSWORD =
  /[a-z0-9A-Z!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|\.]*/;
export const REGEX_FULL_WIDTH = /[０-９ぁ-んァ-ン一-龥\。]+/;
export const REGEX_SPACE = /\s/;
export const REGEX_SPECIAL_PASSWORD = /^(password)$/;
export const REGEX_NUMBER = /^[0-9０-９]+$/;
export const REGEX_PHONE_LENGTH = /^[0-9]{10,11}$/;
export const REGEX_START_ZERO = /^0.+/;
export const REGEX_ZERO = /^0+/;
export const REGEX_HAFT_WIDTH = /[a-zA-Z0-9\-\_\.]*/;
export const NEGATIVE_NUMBER = /-[\d*\.]*\d+$/;
export const DECIMAL_NUMBER = /^\d*\.\d*$/;
export const REGEX_YEAR = /^\d{4}$/;

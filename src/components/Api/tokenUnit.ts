/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-09-02 14:43:29
 * @LastEditTime: 2021-09-02 14:43:30
 */
export class TokenUnit {
    public static abbr = 'Unit';
  
    public static setAbbr (abbr: string = TokenUnit.abbr): void {
      TokenUnit.abbr = abbr;
    }
  }
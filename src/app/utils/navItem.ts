export interface NavItem {
    optionId?: number,
    displayName: string,
  
    logo?: string,
    isActive: boolean,
  
    children?: NavItem[];
  }
export enum ROLES {
  ADMIN = "admin",
  USER = "user",
  LIBRARION = "librarian",
}
export const librarianPages: Array<string> = [
  "/assets",
  "/books",
  "/novels",
  "/ebooks",
  "/journals",
  "/magazines",
  "/languages",
  "/categories",
  "/materialtypes",
  "/publishers",
  "/currencies",
  "/scan",
];
export const adminPages: Array<string> = [
  "/users",
  "/departments",
  "/designations",
  "/locations",
  "/roles",
];
export const userPages: Array<string> = ["/assets"];

export function isAdminPage(requestedPage: string): boolean {
  for (let page of adminPages) {
    if (requestedPage.includes(page) || requestedPage === "/") {
      return true;
    }
  }
  return false;
}
export function isLibrarianPage(requestedPage: string): boolean {
  for (let page of librarianPages) {
    if (requestedPage.includes(page) || requestedPage === "/") {
      return true;
    }
  }
  return false;
}
export function isUserPage(requestedPage: string): boolean {
  for (let page of userPages) {
    if (requestedPage.includes(page) || requestedPage === "/") {
      return true;
    }
  }
  return false;
}

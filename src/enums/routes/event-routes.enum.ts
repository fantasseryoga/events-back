export enum EventRoutes {
  BasePrefix = "events",
  ListPaginated = "list-paginated",
  ListSimilar = "list-similar/:eventId",
  Create = "create",
  Update = "update/:eventId",
  Delete = "delete/:eventId",
  Get = ":eventId",
}

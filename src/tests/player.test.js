import { Player } from "../player";

test("Player attacks position", () => {
  expect(Player().attack("computer")).toStrictEqual([0, 0]);
});

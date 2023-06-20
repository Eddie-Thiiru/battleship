import { Player } from "../player";

test("Get player name", () => {
  expect(Player("user").getName()).toBe("user");
});

test("Get computer name", () => {
  expect(Player("computer AI").getName()).toBe("computer AI");
});

test("Player attacks position", () => {
  expect(Player().attack("computer")).toStrictEqual([0, 0]);
});

test("Attack illegal", () => {
  expect(Player().attack("computer")).toBe(null);
});

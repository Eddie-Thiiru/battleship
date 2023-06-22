import { Player } from "../player";
let playerOne = Player("one");
let playerTwo = Player("two");

test("Get player name", () => {
  expect(playerOne.getName()).toBe("one");
});

test("Get computer name", () => {
  expect(playerTwo.getName()).toBe("two");
});

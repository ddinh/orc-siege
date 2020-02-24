import { Actor } from "../Actors/Actor";
import { Action } from "./Action";
import { World } from "../world";
import { Item } from "../Items/Item";
import { GameObject } from "../GameObject";

export class PickupItemAction extends Action {
    constructor(actor: Actor) {
        super(actor);
    }

    perform(world: World) {
        if (world.getActiveRoom().getObject(this.actor.x, this.actor.y) instanceof Item) {
            
            
            let item = (<Item>world.getActiveRoom().getObject(this.actor.x, this.actor.y));

            this.actor.inventory.push(item);

            // If the actor had nothing else in their inventory, equip this item
            if (this.actor.inventory.length == 1) this.actor.equipt = item;

            // replace the tile with floor (since the item is no longer on floor, but in player's inventory)
            world.getActiveRoom().objects[this.actor.x][this.actor.y] = new GameObject(this.actor.x, this.actor.y, world.getActiveRoom().floorTile);
        }
    }

}
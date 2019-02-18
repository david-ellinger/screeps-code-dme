import { ErrorMapper } from "utils/ErrorMapper";
import { Builder } from './roles/Builder';
import { Harvester } from './roles/Harvester';


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // INFO
  console.log(`Current game tick is ${Game.time}`);
  for (const name in Game.rooms) {
    console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
  }
  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');

  console.log('Harvesters: ' + harvesters.length);
  console.log('Builders: ' + builders.length);

  // BUILD Creeps
  if (harvesters.length < 5) {
    Harvester.factory();
  }
  if (builders.length < 3) {
    Builder.factory();
  }
  if (Game.spawns.Spawn1.spawning) {
    const spawningCreep = Game.creeps[Game.spawns.Spawn1.spawning.name];
    Game.spawns.Spawn1.room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns.Spawn1.pos.x + 1,
      Game.spawns.Spawn1.pos.y,
      { align: 'left', opacity: 0.8 });
  }


  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    const creep = Game.creeps[name];
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    } else {
      if (creep.memory.role === "harvester") {
        Harvester.run(creep);
      } else if (creep.memory.role === "builder") {
        Builder.run(creep);
      }
    }


  }
});

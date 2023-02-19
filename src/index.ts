import { program } from "commander";
import { snapCommand } from "./commands/snapCommand";
import { listCommand } from "./commands/listCommand";
import { loadCommand } from "./commands/loadCommand";
import { deleteCommand } from "./commands/deleteCommand";



program
    .name("snapIt")
    .version("0.0.2")
    .description("A simple CLI to take snaps of files")

program
    .command("snap")
    .argument("<file>", "File to take a snap of")
    .option("-t, --tag <tag>", "Tag to add to the snap")
    .option("-d, --description <description>", "Description of the snap")
    .description("Take a snap of a file")
    .action(snapCommand)

program
    .command("load")
    .argument("<tag>", "Tag of the snap to load")
    .option("-n, --name <name>", "Name of the file to save the snap")
    .description("Load a snap")
    .action(loadCommand)

program
    .command("list")
    .description("List all the snaps")
    .action(listCommand)


program
    .command("delete")
    .argument("<tag>", "Tag of the snap to delete")
    .option("--all", "Delete all the snaps")
    .description("Delete a snap")
    .action(deleteCommand)

program.parse()





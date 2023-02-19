import { createConnection } from "../utils/dbutils";
import { table } from "../utils/generalUtils";

export const listCommand = async () => {
    const { snaps } = await createConnection();
    const snapsList = await snaps.find().toArray();
    // conserve only the fields we want to display
    const mapped = snapsList.map(x => ({ tag: x.tag, description: x.description }));
    table(mapped);
    process.exit(0);
};
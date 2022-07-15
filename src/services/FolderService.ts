import { FolderResponseDto } from "../interface/IFolderInfo";
import { folderResponse } from '../modules/folderResponse';

const getFolders = async(userId: string): Promise<FolderResponseDto> => {
    try{
    const data = await folderResponse(userId);
    return data;
    } catch(error) {
        console.log(error);
        throw error;
    }

}

export default {
    getFolders,
}
import axios from "axios";

// here
export const getMarket = async (req: Request, res: Response) => {
    try {
        const response = await axios.get("http:// ");
        return response.data
    } catch (error) {
        return error
    }
}
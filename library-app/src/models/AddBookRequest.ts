class AddBookRequest {
    title: string;
    author: string;
    description: string;
    copies: number;
    category: string;
    image?: string;

    constructor(title: string, author: string, description: string, copies: number, category: string, image: string) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.category = category;
        this.image = image;
    }
}

export default AddBookRequest;
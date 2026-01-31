import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export const cardService = {
    // Ensure data directory exists
    async init() {
        try {
            await fs.access(DATA_DIR);
        } catch {
            await fs.mkdir(DATA_DIR, { recursive: true });
        }
    },

    async getAllCards() {
        await this.init();
        const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });
        const cards = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const id = entry.name;
                const content = await this.getCardById(id);
                if (content) cards.push({ id, ...content });
            }
        }
        return cards;
    },

    async getCardById(id) {
        try {
            const folderPath = path.join(DATA_DIR, id, 'data.json');
            const content = await fs.readFile(folderPath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            return null;
        }
    },

    async saveCard(id, data) {
        await this.init();
        const cardDir = path.join(DATA_DIR, id);

        try {
            await fs.access(cardDir);
        } catch {
            await fs.mkdir(cardDir, { recursive: true });
        }

        const filePath = path.join(cardDir, 'data.json');
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    },

    async createCard(id, data) {
        const existing = await this.getCardById(id);
        if (existing) throw new Error('Card ID already exists');
        await this.saveCard(id, data);
        return true;
    }
};

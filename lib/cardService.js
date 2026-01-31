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
        const files = await fs.readdir(DATA_DIR);
        const cards = [];
        for (const file of files) {
            if (file.endsWith('.json')) {
                const id = file.replace('.json', '');
                const content = await this.getCardById(id);
                cards.push({ id, ...content });
            }
        }
        return cards;
    },

    async getCardById(id) {
        try {
            const filePath = path.join(DATA_DIR, `${id}.json`);
            const content = await fs.readFile(filePath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            console.error(`Error reading card ${id}:`, error);
            return null;
        }
    },

    async saveCard(id, data) {
        await this.init();
        const filePath = path.join(DATA_DIR, `${id}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    },

    async createCard(id, data) {
        // Check if exists
        const existing = await this.getCardById(id);
        if (existing) throw new Error('Card ID already exists');
        await this.saveCard(id, data);
        return true;
    }
};

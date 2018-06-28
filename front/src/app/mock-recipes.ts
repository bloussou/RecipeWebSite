import {Recette} from './recette';

export const RECIPES: Recette[] = [
    {
        name: 'Riz nature', _id: '1', duration: 15, difficulty: '★', origin: 'Chine',
        type: 'Plat', ingredients: [['Riz', '100g']], steps: 'Faire cuire le riz.'
    },
    {
        name: 'Riz au beurre', _id: '2', duration: 20, difficulty: '★', origin: 'Chine',
        type: 'Plat', ingredients: [['Riz', '100g']], steps: 'Faire cuire le riz, ajouter du beurre.'
    },
    {
        name: 'Ratatouille', _id: '3', duration: 40, difficulty: '★★', origin: 'France',
        type: 'Plat', ingredients: [['Aubergines', '100g'], ['Courgettes', '150g'], ['Poivrons', '50g'], ['Sauce tomate', '50cL']],
        steps: 'Faire cuire les légumes, ajouter la sauce tomate.'
    },
    {
        name: 'Pates au pesto', _id: '4', duration: 10, difficulty: '★', origin: 'Italie',
        type: 'Plat', ingredients: [['Pâtes', '100g']], steps: 'Faire cuire les pâtes, ajouter le pesto.'
    },
    {
        name: 'Chips', _id: '5', duration: 45, difficulty: '★★★', origin: 'USA',
        type: 'Apéro', ingredients: [['Pommes de terre', '100g']],
        steps: 'Découper des pommes de terre en fines chips. Saler, puis dorer au four.'
    },
    {
        name: 'Filet de merlan à la tourteraie', _id: '6', duration: 100, difficulty: '★★★★★', origin: 'Hawaii',
        type: 'Plat', ingredients: [['Plein de trucs', 'en masse']], steps: 'Faire des bails compliqués, puis manger.'
    }

];

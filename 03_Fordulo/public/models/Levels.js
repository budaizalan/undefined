export default class Levels {
    static level;
    static cities;
    static factories;
    static levels = [
        {
            level: 1,
            cities: [] = [
                {
                    id: 1,
                    position: { q: -4, r: -2 },
                    type: 'blue'
                },
                {
                    id: 2,
                    position: { q: 5, r: -2 },
                    type: 'green'
                },
                {
                    id: 3,
                    position: { q: 0, r: 0 },
                    type: 'red'
                }
            ],
            factories: [] = [
                {
                    type: 'blue',
                    amount: 1,
                },
                {
                    type: 'green',
                    amount: 1,
                },
                {
                    type: 'red',
                    amount: 1,
                }
            ]
        },
        {
            level: 2,
            cities: [] = [
                {
                    id: 1,
                    position: { q: -3, r: 2 },
                    type: 'blue'
                },
                {
                    id: 2,
                    position: { q: 0, r: -2 },
                    type: 'green'
                },
                {
                    id: 3,
                    position: { q: 1, r: 2 },
                    type: 'red'
                }
            ],
            factories: [] = [
                {
                    type: 'blue',
                    amount: 1,
                },
                {
                    type: 'green',
                    amount: 1,
                },
                {
                    type: 'red',
                    amount: 1,
                }
            ]
        },
        {
            level: 3,
            cities: [] = [
                {
                    id: 1,
                    position: { q: 0, r: -4 },
                    type: 'blue'
                },
                {
                    id: 2,
                    position: { q: 6, r: -2 },
                    type: 'green'
                },
                {
                    id: 3,
                    position: { q: 0, r: 0 },
                    type: 'red'
                }
            ],
            factories: [] = [
                {
                    type: 'blue',
                    amount: 1,
                },
                {
                    type: 'green',
                    amount: 1,
                },
                {
                    type: 'red',
                    amount: 1,
                }
            ]
        }
    ];
}

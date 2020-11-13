const Car = require('./carsModel')
const db = require('../data/dbConfig.js');

beforeEach(async () => {
    await db('cars').truncate()
})

describe('cars model', () => {
    describe('getAll()', () => {
        it('gets an empty array', async () => {
            const cars = await Car.getAll()
            expect(cars).toHaveLength(0)
        })
        it('gets all the cars', async () => {
            await db('cars').insert({ name: "mustang" })
            let cars = await Car.getAll()
            expect(cars).toHaveLength(1)

            await db('cars').insert({ name: "camaro" })
            cars = await Car.getAll()
            expect(cars).toHaveLength(2)
        })
    })
    describe('insert()', () => {
        it('can insert cars', async () => {
            await Car.insert({ name: "mustang" })
            let cars = await Car.getAll()
            expect(cars).toHaveLength(1)

            await Car.insert({ name: "camaro" })
            cars = await Car.getAll()
            expect(cars).toHaveLength(2)
        })
        it('gives back the inserted Car', async () => {
            const mustang = await Car.insert({ name: "mustang" })
            expect(mustang).toMatchObject({ id: 1, name: 'mustang' })
            const camaro = await Car.insert({ name: "camaro" })
            expect(camaro).toMatchObject({ id: 2, name: 'camaro' })
        })
    })
    describe('update()', () => {
        it('can insert', async () => {
            await db('cars').insert({ name: "camaro" })
            let mustang = await Car.update(1, { name: 'mustang' })
            expect(mustang).toMatchObject({ id: 1, name: 'mustang' })
            mustang = await db('cars').where({ id: 1 }).first()
            expect(mustang.name).toBe('mustang')
        })
    })
    describe('remove()', () => {
        it('can remove ', async () => {
            await db('cars').insert({ name: "camaro" })
            await Car.remove(1)
            let cars = await db('cars')
            expect(cars).toHaveLength(0)
        })
    })
    describe('findById', () => {
        it('can find Car By Id ', async () => {
            await db('cars').insert({ name: "mustang" })
            const mustang = await Car.findById(1)
            expect(mustang.name).toBe('mustang')
        })
    })
})
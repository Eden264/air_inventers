namespace SpriteKind {
    export const boss = SpriteKind.create()
    export const shoot = SpriteKind.create()
    export const s = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite3 = sprites.create(img`
        2 2 
        2 2 
        2 2 
        2 2 
        `, SpriteKind.Projectile)
    mySprite4 = sprites.create(img`
        2 2 
        2 2 
        2 2 
        2 2 
        `, SpriteKind.Projectile)
    mySprite3.y = mySprite.y
    mySprite3.x = mySprite.x - 4
    mySprite4.y = mySprite.y
    mySprite4.x = mySprite.x + 4
    mySprite3.vy = -125
    mySprite4.vy = -125
    mySprite3.setFlag(SpriteFlag.DestroyOnWall, true)
    mySprite4.setFlag(SpriteFlag.DestroyOnWall, true)
})
function boss_is_comeing (myImage: Image) {
    if (spriteutils.isDestroyed(boss_sprit)) {
        boss_sprit = sprites.create(myImage, SpriteKind.boss)
        boss_sprit.setPosition(80, 40)
        statusbar = statusbars.create(20, 4, StatusBarKind.Health)
        statusbar.attachToSprite(boss_sprit)
        info.setLife(5)
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    mySprite5 = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.Food)
    mySprite5.setFlag(SpriteFlag.StayInScreen, true)
    mySprite5.setPosition(sprite.x, sprite.y)
    mySprite5.vy = 55
    sprite.destroy()
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.shoot, SpriteKind.s, function (sprite, otherSprite) {
    if (0 < info.score()) {
        sprite.destroy()
        info.changeScoreBy(-1)
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    status.spriteAttachedTo().destroy()
    for (let index = 0; index < 50; index++) {
        mySprite5 = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Food)
        mySprite5.setFlag(SpriteFlag.StayInScreen, true)
        mySprite5.setPosition(randint(status.spriteAttachedTo().x - 8, status.spriteAttachedTo().x + 8), status.spriteAttachedTo().y)
        mySprite5.vy = 55
        pause(100)
    }
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprite.setVelocity(randint(-35, 35), 25)
})
sprites.onOverlap(SpriteKind.shoot, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    statusbar.value += -2
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
let projectile: Sprite = null
let mySprite2: Sprite = null
let mySprite5: Sprite = null
let statusbar: StatusBarSprite = null
let boss_sprit: Sprite = null
let mySprite4: Sprite = null
let mySprite3: Sprite = null
let mySprite: Sprite = null
tiles.setTilemap(tilemap`level2`)
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . 4 . c c c c . 4 . . . . 
    . . . b b b c c c c b b b . . . 
    . . b b b b c c c c b b b b . . 
    . b b 2 2 b c c c c b 2 2 b b . 
    . . . d d . . c c . . d d . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.y = 114
info.setLife(5)
game.onUpdateInterval(35000, function () {
    if (game.runtime() > 500) {
        boss_is_comeing(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ........d............d..........
            ........d............d..........
            .......ddd..........ddd.........
            .......ddd...bbbb...ddd.........
            ..d...ddddd...bb...ddddd.....d..
            ..d.d.ddddd...cc...ddddd...d.d..
            ..d.d.ddddd...cc...ddddd...d.d..
            ..d.d.ddddd...cc...ddddd...d.d..
            ..dbbb24242bbbccbbb24242bbbbbd..
            ...dbbbbbbbbbbccbbbbbbbbbbbbd...
            ....d...bbbbbbccbbbbbb.....d....
            ...........bbbccbbb.............
            .............bccb...............
            ..............cc................
            ..............cc................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            `)
    }
})
game.onUpdateInterval(randint(150, 1500), function () {
    if (spriteutils.isDestroyed(boss_sprit)) {
        mySprite2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . c c c c . . . . . . 
            . . . . . . . c c . . . . . . . 
            . . . . . . . c c . . . . . . . 
            . . b 4 4 b b c c b b 4 4 b . . 
            . . . b b b c c c c b b b . . . 
            . . . . b b c c c c b b . . . . 
            . . . . . . . c c . . . . . . . 
            . . . . . . . c c . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        mySprite2.setFlag(SpriteFlag.AutoDestroy, true)
        tiles.placeOnRandomTile(mySprite2, assets.tile`tile0`)
        mySprite2.setVelocity(randint(-35, 35), 25)
    }
})
game.onUpdateInterval(500, function () {
    if (!(spriteutils.isDestroyed(boss_sprit))) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
            . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
            . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            `, boss_sprit, mySprite.x - boss_sprit.x, mySprite.y - boss_sprit.y)
        projectile.setKind(SpriteKind.shoot)
    }
})

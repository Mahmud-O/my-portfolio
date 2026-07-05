import { CELL_SIZE, INITIAL_SNAKE } from '@/lib/constants'
import { DirectionType, GameState, SnakePosition } from '@/lib/types'
import { checkCollision, generateFood } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import {
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight,
    FaChevronUp,
} from 'react-icons/fa6'

const SnakeGame = () => {
    const [gameState, setGameState] = useState<GameState>({
        snake: INITIAL_SNAKE,
        food: generateFood(INITIAL_SNAKE),
        direction: 'UP',
        isGameOver: false,
        score: 0,
        isPlaying: false,
    })
    const [gameCompleted, setGameCompleted] = useState(false)
    const handleGameComplete = useCallback(() => {
        if (!gameCompleted) {
            setGameCompleted(true)

            setTimeout(() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }, 3000)
        }
    }, [gameCompleted])

    const [nextDirection, setNextDirection] = useState<DirectionType>('UP')
    // Handle direction change
    const changeDirection = useCallback((newDirection: DirectionType) => {
        setNextDirection((prev) => {
            // Prevent opposite direction
            if (
                (prev === 'UP' && newDirection === 'DOWN') ||
                (prev === 'DOWN' && newDirection === 'UP') ||
                (prev === 'LEFT' && newDirection === 'RIGHT') ||
                (prev === 'RIGHT' && newDirection === 'LEFT')
            ) {
                return prev
            }
            return newDirection
        })
    }, [])

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameState.isPlaying) return

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault()
                    changeDirection('UP')
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    changeDirection('DOWN')
                    break
                case 'ArrowLeft':
                    e.preventDefault()
                    changeDirection('LEFT')
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    changeDirection('RIGHT')
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [gameState.isPlaying, changeDirection])

    // Check if game is complete (10 food items)
    useEffect(() => {
        if (gameState.score >= 10 && !gameCompleted) {
            handleGameComplete()
        }
    }, [gameState.score, gameCompleted])

    // Game loop
    useEffect(() => {
        if (!gameState.isPlaying || gameState.isGameOver) return

        const gameInterval = setInterval(() => {
            setGameState((prev: GameState) => {
                const currentDirection = nextDirection
                const head = prev.snake[0]
                let newHead: SnakePosition = INITIAL_SNAKE[0]

                // Calculate new head position
                switch (currentDirection) {
                    case 'UP':
                        newHead = { x: head.x, y: head.y - 1 }
                        break
                    case 'DOWN':
                        newHead = { x: head.x, y: head.y + 1 }
                        break
                    case 'LEFT':
                        newHead = { x: head.x - 1, y: head.y }
                        break
                    case 'RIGHT':
                        newHead = { x: head.x + 1, y: head.y }
                        break
                }

                // Check collision
                if (checkCollision(newHead, prev.snake)) {
                    return { ...prev, isGameOver: true, isPlaying: false }
                }

                // Check if food is eaten
                const ateFood =
                    newHead.x === prev.food.x && newHead.y === prev.food.y
                const newSnake = [newHead, ...prev.snake]

                if (!ateFood) {
                    newSnake.pop()
                }

                const newScore = ateFood ? prev.score + 1 : prev.score
                const newFood = ateFood ? generateFood(newSnake) : prev.food
                let gameOver = prev.isGameOver
                if (newScore >= 10) {
                    gameOver = true
                }
                return {
                    ...prev,
                    snake: newSnake,
                    food: newFood,
                    isGameOver: gameOver,
                    score: newScore,
                    direction: currentDirection,
                }
            })
        }, 150)

        return () => clearInterval(gameInterval)
    }, [
        gameState.isPlaying,
        gameState.isGameOver,
        nextDirection,
        gameCompleted,
    ])

    const startGame = () => {
        setGameState({
            snake: INITIAL_SNAKE,
            food: generateFood(INITIAL_SNAKE),
            direction: 'UP',
            isGameOver: false,
            score: 0,
            isPlaying: true,
        })
        setNextDirection('UP')
    }

    const restartGame = () => {
        startGame()
    }

    const skipGame = () => {
        handleGameComplete()
    }

    return (
        <div className="hidden relative w-[507px] h-[469px] bg-gradient-to-br from-teal-900/70 to-teal-500/10 border border-slate-600 rounded-md backdrop-blur-sm shadow-inner p-8 lg:flex gap-6">
            <div className="relative w-60 h-full">
                <div className="w-full h-full bg-slate-800 rounded-lg shadow-inner relative overflow-hidden">
                    {/* Game Grid */}
                    {gameState.isPlaying && !gameState.isGameOver && (
                        <>
                            {/* Snake */}
                            {gameState.snake.map(
                                (segment: SnakePosition, index: number) => (
                                    <div
                                        key={index}
                                        className="absolute bg-teal-400 rounded-sm transition-all duration-75"
                                        style={{
                                            width: `${CELL_SIZE}px`,
                                            height: `${CELL_SIZE}px`,
                                            left: `${segment.x * CELL_SIZE}px`,
                                            top: `${segment.y * CELL_SIZE}px`,
                                        }}
                                    />
                                )
                            )}

                            {/* Food */}
                            <div
                                className="absolute"
                                style={{
                                    left: `${gameState.food.x * CELL_SIZE}px`,
                                    top: `${gameState.food.y * CELL_SIZE}px`,
                                }}
                            >
                                <div className="relative w-5 h-5">
                                    <div className="absolute inset-0 bg-teal-400 opacity-10 rounded-full" />
                                    <div className="absolute inset-1 bg-teal-400 opacity-20 rounded-full" />
                                    <div className="absolute inset-2 bg-teal-400 rounded-full" />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Game Over Screen */}
                    {gameState.isGameOver && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-slate-900/90 rounded-lg p-4 mx-2">
                                <div className="text-center">
                                    <h3 className="text-2xl text-teal-400 font-normal mb-2">
                                        {gameState.score >= 10
                                            ? 'YOU WON!'
                                            : 'GAME OVER!'}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-3">
                                        Score: {gameState.score}
                                    </p>
                                    <button
                                        onClick={restartGame}
                                        className="text-sm w-full h-10 bg-orange-400 text-teal-950 rounded-lg  cursor-pointer hover:bg-orange-500 transition-colors"
                                    >
                                        {gameState.score >= 10
                                            ? 'start-game'
                                            : 'try-again'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Initial State */}
                    {!gameState.isPlaying && !gameState.isGameOver && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-slate-400 text-sm mb-3">
                                    Press Start to Play
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-between h-full w-44">
                <div className="flex flex-col gap-6">
                    <div className="bg-slate-800 rounded-lg p-3 flex flex-col items-center gap-3">
                        <p className="text-white text-sm text-center leading-5">
                            {`// use keyboard`}
                            <br />
                            {`// arrows to play`}
                        </p>

                        <div className="flex flex-col items-center gap-2">
                            <button
                                className="w-12 h-8 bg-black border border-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50"
                                onClick={() => changeDirection('UP')}
                                disabled={!gameState.isPlaying}
                            >
                                <FaChevronUp size={18} className="text-white" />
                            </button>

                            <div className="flex gap-2">
                                <button
                                    className="w-12 h-8 bg-black border border-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50"
                                    onClick={() => changeDirection('LEFT')}
                                    disabled={!gameState.isPlaying}
                                >
                                    <FaChevronLeft
                                        size={18}
                                        className="text-white"
                                    />
                                </button>
                                <button
                                    className="w-12 h-8 bg-black border border-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50"
                                    onClick={() => changeDirection('DOWN')}
                                    disabled={!gameState.isPlaying}
                                >
                                    <FaChevronDown
                                        size={18}
                                        className="text-white"
                                    />
                                </button>
                                <button
                                    className="w-12 h-8 bg-black border border-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50"
                                    onClick={() => changeDirection('RIGHT')}
                                    disabled={!gameState.isPlaying}
                                >
                                    <FaChevronRight
                                        size={18}
                                        className="text-white"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 px-3">
                        <p className="text-white text-sm">{`// food left`}</p>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`relative w-5 h-5 ${
                                            i < gameState.score &&
                                            gameState.score < 5
                                                ? 'opacity-30'
                                                : ''
                                        }`}
                                    >
                                        <div className="absolute inset-0 bg-teal-400 opacity-10 rounded-full" />
                                        <div className="absolute inset-1 bg-teal-400 opacity-20 rounded-full" />
                                        <div className="absolute inset-2 bg-teal-400 rounded-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`relative w-5 h-5 ${
                                            i + 5 < gameState.score
                                                ? 'opacity-30'
                                                : ''
                                        }`}
                                    >
                                        <div className="absolute inset-0 bg-teal-400 opacity-10 rounded-full" />
                                        <div className="absolute inset-1 bg-teal-400 opacity-20 rounded-full" />
                                        <div className="absolute inset-2 bg-teal-400 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {!gameState.isPlaying ? (
                    gameState.isGameOver && gameState.score > 0 ? (
                        <button
                            onClick={skipGame}
                            className="w-14 h-10 border right-0 border-white rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <span className="text-white text-sm">skip</span>
                        </button>
                    ) : (
                        <button
                            onClick={startGame}
                            className="w-full h-10 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            <span className="text-sm">start-game</span>
                        </button>
                    )
                ) : (
                    <button
                        onClick={skipGame}
                        className="w-14 h-10 border border-white rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <span className="text-white text-sm">skip</span>
                    </button>
                )}
            </div>
            <div className="absolute top-4 left-3 w-3 h-3 rounded-full bg-teal-800 drop-shadow-xs text-teal-950 flex justify-center items-center text-[11px] ">
                <span className="translate-y-[-1px] translate-x-[1px] shadow-lg font-bold">
                    x
                </span>
            </div>
            <div className="absolute top-4 right-3 w-3 h-3 rounded-full bg-teal-800 shadow-lg text-teal-950 flex justify-center items-center text-[11px] ">
                <span className="translate-y-[-1px] translate-x-[1px] shadow-lg font-bold">
                    x
                </span>
            </div>
            <div className="absolute bottom-4 left-3 w-3 h-3 rounded-full bg-slate-600 shadow-lg text-teal-950 flex justify-center items-center text-[11px] ">
                <span className="translate-y-[-1px] translate-x-[1px] shadow-lg font-bold">
                    x
                </span>
            </div>
            <div className="absolute bottom-4 right-3 w-3 h-3 rounded-full bg-slate-600 shadow-lg text-teal-950 flex justify-center items-center text-[11px] ">
                <span className="translate-y-[-1px] translate-x-[1px] shadow-lg font-bold">
                    x
                </span>
            </div>
        </div>
    )
}
export default SnakeGame


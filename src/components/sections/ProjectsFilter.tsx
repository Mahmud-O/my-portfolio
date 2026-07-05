import { FaReact } from 'react-icons/fa'
import { RiNextjsFill } from 'react-icons/ri'

const filters = [
    { id: 'react', name: 'React', icon: FaReact, color: 'text-cyan-400' },
    { id: 'nextjs', name: 'Next.js', icon: RiNextjsFill, color: 'text-white' },
    {
        id: 'js',
        name: 'JavaScript',
        icon: () => <span className="text-yellow-400 text-xl">{'{}'}</span>,
        color: 'text-yellow-400',
    },
    {
        id: 'html,css',
        name: 'HTML/CSS',
        icon: () => <span className="text-orange-500 text-xl">{'<>'}</span>,
        color: 'text-orange-500',
    },
]

export default function ProjectsFilter({
    selected,
    onChange,
}: {
    selected: string[]
    onChange: (techs: string[]) => void
}) {
    const toggle = (id: string) => {
        onChange(
            selected.includes(id)
                ? selected.filter((t) => t !== id)
                : [...selected, id]
        )
    }

    return (
        <div className="flex flex-wrap gap-3 justify-center my-8">
            {filters.map((f) => (
                <button
                    key={f.id}
                    onClick={() => toggle(f.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                        selected.includes(f.id)
                            ? 'bg-yellow-500 text-black'
                            : 'bg-[#252526] text-[#d4d4d4] hover:bg-[#3e3e42]'
                    }`}
                >
                    <f.icon />
                    <span>{f.name}</span>
                </button>
            ))}
            {selected.length > 0 && (
                <button
                    onClick={() => onChange([])}
                    className="px-6 py-3 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition"
                >
                    Clear All
                </button>
            )}
        </div>
    )
}


import { technologies } from '@/lib/constants'
import { FaChevronDown, FaCheck, FaFilter } from 'react-icons/fa6'

type TechSidebarProps = {
    selectedTech: string[]
    onTechChange: (techs: string[]) => void
    isMobileOpen: boolean
    onMobileToggle: () => void
    onMobileClose: () => void
}

export default function TechSidebar({
    selectedTech,
    onTechChange,
    isMobileOpen,
    onMobileToggle,
    onMobileClose,
}: TechSidebarProps) {
    const toggleTech = (id: string) => {
        onTechChange(
            selectedTech.includes(id)
                ? selectedTech.filter((t) => t !== id)
                : [...selectedTech, id]
        )
    }

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={onMobileToggle}
                className="lg:hidden fixed bottom-18 right-4 z-50 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-700 transition-all"
            >
                <FaFilter size={20} className="text-white" />
                {selectedTech.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                        {selectedTech.length}
                    </span>
                )}
            </button>

            {/* Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:static inset-y-0 left-0 z-40 w-[280px] md:w-[24.95%]
          bg-slate-900 border-r border-slate-600
          transform transition-transform duration-300 ease-in-out overflow-auto
          ${
              isMobileOpen
                  ? 'translate-x-0'
                  : '-translate-x-full lg:translate-x-0'
          }
        `}
            >
                <div className="flex flex-col h-full lg:pt-0 pt-14">
                    {/* Header */}
                    <div className="h-10 border-b border-slate-600 flex items-center justify-between px-4 lg:px-6 gap-3 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <FaChevronDown size={16} className="text-white" />
                            <span className="text-white text-sm lg:text-base font-medium">
                                projects
                            </span>
                        </div>
                        {selectedTech.length > 0 && (
                            <button
                                onClick={() => onTechChange([])}
                                className="lg:hidden text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="flex-1 px-3 py-4 flex flex-col gap-2 overflow-auto">
                        <div className="flex items-center justify-between px-3 mb-2">
                            <span className="text-slate-400 text-xs uppercase tracking-wide">
                                Filter by Technology
                            </span>
                            {selectedTech.length > 0 && (
                                <button
                                    onClick={() => onTechChange([])}
                                    className="hidden lg:block text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        <div>
                            {technologies.map((tech) => (
                                <button
                                    key={tech.id}
                                    onClick={() => toggleTech(tech.id)}
                                    className={`
                                        flex items-center px-3 gap-4 cursor-pointer
                                        hover:bg-slate-800/50 active:bg-slate-800/70
                                        py-2 rounded-sm transition-all
                                    w-full
                                    
                                `}
                                >
                                    {/* Checkbox */}
                                    <div className="w-5 h-5 relative flex-shrink-0">
                                        <div
                                            className={`absolute inset-0 border-2 rounded-sm transition-colors ${
                                                selectedTech.includes(tech.id)
                                                    ? 'bg-slate-500 border-slate-500'
                                                    : 'bg-slate-900 border-slate-500'
                                            }`}
                                        />
                                        {selectedTech.includes(tech.id) && (
                                            <FaCheck
                                                size={14}
                                                className="absolute top-0.5 left-0.5 text-white"
                                            />
                                        )}
                                    </div>

                                    {/* Tech Info */}
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <span className="text-lg lg:text-xl flex-shrink-0">
                                            {typeof tech.icon === 'string' ? (
                                                <span>{tech.icon}</span>
                                            ) : (
                                                <tech.icon
                                                    size={16}
                                                    className={tech.color}
                                                />
                                            )}
                                        </span>
                                        <span className="text-white text-sm lg:text-base truncate">
                                            {tech.name}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Apply */}
                    <div className="lg:hidden h-12 border-t border-slate-600 flex items-center justify-between px-4 py-3 flex-shrink-0">
                        <span className="text-slate-400 text-sm">
                            {`// ${selectedTech.length} selected //`}
                        </span>
                        <button
                            onClick={onMobileClose}
                            className="px-4 py-1 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}


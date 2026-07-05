import { contactItems } from '@/lib/constants'
import { useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FaChevronDown } from 'react-icons/fa6'
type SectionKey = 'contacts' | 'find-me'
const ContactSidebar = () => {
    const [expandedSections, setExpandedSections] = useState({
        contacts: true,
        'find-me': true,
    })

    const socialLinks = [
        {
            name: 'LinkedIn profile',
            link: 'https://www.linkedin.com/in/ma252002/',
        },
        {
            name: 'Facebook profile',
            link: 'https://www.facebook.com/mahmoud.osama.550367',
        },
        { name: 'WhatsApp account', link: 'https://wa.me/+201016074277' },
        { name: 'GitHub account', link: 'https://github.com/Mahmud-O' },
    ]
    const toggleSection = (sectionKey: SectionKey) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionKey]: !prev[sectionKey],
        }))
    }
    return (
        <div className="hidden h-full lg:flex flex-col border-r border-slate-600">
            <div className="flex flex-col">
                <div
                    className="h-12 border-b border-slate-600 flex items-center px-6 gap-3 cursor-pointer hover:bg-slate-800/30"
                    onClick={() => toggleSection('contacts')}
                >
                    <FaChevronDown size={16} className="text-white" />
                    <span className="text-white text-base">contacts</span>
                </div>

                {expandedSections['contacts'] && (
                    <div className="px-3 py-3 flex flex-col gap-2">
                        {contactItems.map((contact, index) => (
                            <div
                                key={index}
                                className="flex items-center px-3 gap-2 hover:bg-slate-800/30 cursor-pointer py-1"
                            >
                                <contact.icon
                                    size={16}
                                    className="text-slate-500"
                                />
                                <span className="text-slate-400 text-base">
                                    {contact.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col border-t border-slate-600">
                <div
                    className="h-12 border-b border-slate-600 flex items-center px-6 gap-3 cursor-pointer hover:bg-slate-800/30"
                    onClick={() => toggleSection('find-me')}
                >
                    <FaChevronDown size={16} className="text-white" />
                    <span className="text-white text-base">
                        find-me-also-on
                    </span>
                </div>

                {expandedSections['find-me'] && (
                    <div className="px-3 py-3 flex flex-col gap-2">
                        {socialLinks.map((link, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    if (link.link) {
                                        window.open(link.link, '_blank')
                                    }
                                }}
                                className="flex group items-center px-3 gap-2 hover:bg-slate-800/30 cursor-pointer py-1"
                            >
                                <FaExternalLinkAlt
                                    size={16}
                                    className="text-slate-500"
                                />
                                <span
                                    className={`text-base group-hover:text-white text-slate-400`}
                                >
                                    {link.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default ContactSidebar

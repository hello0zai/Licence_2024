import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import {GiMusicalScore, GiMusicSpell, GiNotebook, GiStabbedNote} from "react-icons/gi";
import {BsFillBookFill, BsMusicNoteList} from "react-icons/bs";
import {PiExamFill, PiMusicNotesPlusLight, PiStudentBold, PiStudentFill} from "react-icons/pi";
import {IoDocuments, IoList} from "react-icons/io5";
import {
    HiMiniClipboardDocumentCheck,
    HiMiniClipboardDocumentList
} from "react-icons/hi2";
import {BiSolidBookAdd, BiSolidBookReader} from "react-icons/bi";
import {ImBooks} from "react-icons/im";
import {LiaPenSolid} from "react-icons/lia";
import {AiTwotoneSetting} from "react-icons/ai";
import {FaTrophy} from "react-icons/fa";
import {MdPlaylistAdd} from "react-icons/md";

export const SidebarData = [
    // Admin
    {
        title: 'Utilizatori',
        path: '/user',
        icon: <BiIcons.BiSolidUser/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['ADMIN_ROLE'],
        subNav: [
            {
                title: 'Listă utilizatori',
                path: '/user/list',
                icon: <BiIcons.BiSolidUserDetail/>
            },
            {
                title: 'Adaugă utilizator',
                path: '/user/add',
                icon: <RiIcons.RiUserAddFill/>
            }
        ]
    },
    {
        title: 'Discipline',
        path: '/subject',
        icon: <GiMusicalScore/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['ADMIN_ROLE'],
        subNav: [
            {
                title: 'Listă discipline',
                path: '/subject/list',
                icon: <BsMusicNoteList/>
            },
            {
                title: 'Adaugă disciplină',
                path: '/subject/add',
                icon: <PiMusicNotesPlusLight/>
            }
        ]
    },
    {
        title: 'Admitere documente',
        path: '/registration/documents',
        icon: <IoDocuments/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['ADMIN_ROLE'],
        subNav: [
            {
                title: 'Listă',
                path: '/registration/documents/list',
                icon: <HiMiniClipboardDocumentList/>
            },
            {
                title: 'Adaugă',
                path: '/registration/documents/add',
                icon: <HiMiniClipboardDocumentCheck/>
            },
        ]
    },
    {
        title: 'Concursuri admitere',
        path: '/contest',
        icon: <FaTrophy/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['ADMIN_ROLE'],
        subNav: [
            {
                title: 'Listă',
                path: '/contest/list',
                icon: <IoList />
            },
            {
                title: 'Adaugă',
                path: '/contest/add',
                icon: <MdPlaylistAdd />
            },
        ]
    },
    {
        title: 'Cursuri',
        path: '/course',
        icon: <BiSolidBookReader/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['ADMIN_ROLE'],
        subNav: [
            {
                title: 'Listă',
                path: '/course/list',
                icon: <ImBooks/>
            },
            {
                title: 'Adaugă',
                path: '/course/add',
                icon: <BiSolidBookAdd/>
            },
        ]
    },
    // Secretary
    {
        title: 'Discipline',
        path: '/secretary/subject',
        icon: <GiMusicalScore/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['SECRETARY_ROLE'],
        subNav: [
            {
                title: 'Listă discipline',
                path: '/secretary/subject/view',
                icon: <BsMusicNoteList/>
            },
        ]
    },

    {
        title: 'Cursuri',
        path: '/secretary/course',
        icon: <BiSolidBookReader/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['SECRETARY_ROLE'],
        subNav: [
            {
                title: 'Listă',
                path: '/secretary/course/view',
                icon: <ImBooks/>
            },
            {
                title: 'Configurează cursuri',
                path: '/secretary/course/configuration',
                icon: <AiTwotoneSetting/>
            }
        ]
    },

    {
        title: 'Înscrieri',
        path: '/student/register',
        icon: <LiaPenSolid/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['SECRETARY_ROLE'],
        subNav: [
            {
                title: 'Înscrie student',
                path: '/student/register',
                icon: <RiIcons.RiUserAddFill/>
            }
        ]
    },

    {
        title: 'Studenți',
        path: '/students',
        icon: <PiStudentFill/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['SECRETARY_ROLE'],
        subNav: [
            {
                title: 'Listă studenți',
                path: '/students/list',
                icon:<BiIcons.BiSolidUserDetail/>
            },
        ]
    },

    {
        title: 'Note',
        path: '/secretary/grades',
        icon: <GiNotebook/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['SECRETARY_ROLE'],
        subNav: [
            {
                title: 'Adaugă note',
                path: '/secretary/grades/choose/course',
                icon:<GiStabbedNote/>
            },
        ]
    },

    {
        title: 'Profil',
        path: '/profile',
        icon: <FaIcons.FaUserCircle/>,
        authorization: ['ADMIN_ROLE'],
    },
    {
        title: 'Profil',
        path: '/secretary/profile',
        icon: <FaIcons.FaUserCircle/>,
        authorization: ['SECRETARY_ROLE'],
    },
    {
        title: 'Profil',
        path: '/teacher/profile',
        icon: <FaIcons.FaUserCircle/>,
        authorization: ['TEACHER_ROLE'],
    },
    {
        title: 'Profil',
        path: '/student/profile',
        icon: <FaIcons.FaUserCircle/>,
        authorization: ['STUDENT_ROLE'],
    },

    {
        title: 'Înscrieri',
        path: '/student/register',
        icon: <LiaPenSolid/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        authorization: ['STUDENT_ROLE'],
        subNav: [
            {
                title: 'Înscrie student',
                path: '/student/register',
                icon: <RiIcons.RiUserAddFill/>
            }
        ]
    },
];
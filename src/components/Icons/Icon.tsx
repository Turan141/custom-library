// Core
import React from 'react';
import IconBase from '@components/Icons/IconBase';

// Assets
import adressBook from '@assets/icons/address book - Line.svg';
import administration from '@assets/icons/Administration.svg';
import angleDown from '@assets/icons/angle-down.svg';
import angleUp from '@assets/icons/angle-up.svg';
import applications from '@assets/icons/Applications.svg';
import attachment from '@assets/icons/attachment.svg';
import building from '@assets/icons/Building.svg';
import add from '@assets/icons/Button add.svg';
import addCompany from '@assets/icons/Button Add Company.svg';
import addPeople from '@assets/icons/Button Add People.svg';
import addAdressBook from '@assets/icons/Button address book.svg';
import closed from '@assets/icons/Button Closed.svg';
import done from '@assets/icons/Button Done.svg';
import further from '@assets/icons/Button Further.svg';
import more from '@assets/icons/Button More.svg';
import save from '@assets/icons/Button Save.svg';
import unload from '@assets/icons/Button unload.svg';
import warning from '@assets/icons/Button Warning.svg';
import calendar from '@assets/icons/Calendar.svg';
import chevronDown from '@assets/icons/chevron-down - normal.svg';
import chevronLeft from '@assets/icons/chevron-left - normal.svg';
import chevronRight from '@assets/icons/chevron-right - normal.svg';
import chevronUp from '@assets/icons/chevron-up - normal.svg';
import claimArchive from '@assets/icons/Claim active.svg';
import close from '@assets/icons/closed.svg';
import contacts from '@assets/icons/Directory of contacts.svg';
import check from '@assets/icons/Check.svg';
import document from '@assets/icons/DOCUMENT.svg';
import documentAdd from '@assets/icons/Document add.svg';
import documentSection from '@assets/icons/DOCUMENT_Section.svg';
import documentSee from '@assets/icons/DOCUMENT_see.svg';
import checkmark from '@assets/icons/documents-file-checkmark.svg';
import emails from '@assets/icons/Emails.svg';
import extAudit from '@assets/icons/external audit.svg';
import eye from '@assets/icons/eye.svg';
import eyeSlash from '@assets/icons/eye-slash.svg';
import favoritesHover from '@assets/icons/Favorites - Hover.svg';
import favoritesSelected from '@assets/icons/Favorites - Selected.svg';
import history from '@assets/icons/Histoty.svg';
import home from '@assets/icons/Home.svg';
import stepEdit from '@assets/icons/Horizontal steps - Edit.svg';
import stepError from '@assets/icons/Horizontal steps - Error.svg';
import stepNormal from '@assets/icons/Horizontal steps - Normal.svg';
import stepSelect from '@assets/icons/Horizontal steps - Select.svg';
import image from '@assets/icons/image.svg';
import company from '@assets/icons/Info Company.svg';
import complex from '@assets/icons/Info Complex.svg';
import department from '@assets/icons/Info Department.svg';
import division from '@assets/icons/Info Division.svg';
import infoEmail from '@assets/icons/Info Email.svg';
import infoHome from '@assets/icons/Info Home.svg';
import infoPhone from '@assets/icons/Info Phone.svg';
import infoService from '@assets/icons/Info Service.svg';
import addCircle from '@assets/icons/Interaction add_circle.svg';
import agreed from '@assets/icons/Interaction Agreed.svg';
import archiv from '@assets/icons/Interaction Archiv.svg';
import deleteIcon from '@assets/icons/Interaction delete.svg';
import edit from '@assets/icons/Interaction edit.svg';
import exit from '@assets/icons/Interaction Exit.svg';
import interactionList from '@assets/icons/Interaction List.svg';
import message from '@assets/icons/Interaction Message.svg';
import messageProfile from '@assets/icons/Interaction Message_profile.svg';
import interactionPassword from '@assets/icons/Interaction Password.svg';
import toWork from '@assets/icons/Interaction To work.svg';
import internalAudit from '@assets/icons/internal audit.svg';
import leadership from '@assets/icons/Leadership.svg';
import legal from '@assets/icons/Legal.svg';
import list from '@assets/icons/list.svg';
import login from '@assets/icons/Login.svg';
import loop from '@assets/icons/loop.svg';
import menu from '@assets/icons/Menu.svg';
import module from '@assets/icons/Module.svg';
import money from '@assets/icons/Money.svg';
import money1 from '@assets/icons/Money-1.svg';
import monitoring from '@assets/icons/Monitoring.svg';
import moreCircle from '@assets/icons/More_circle - normal.svg';
import news from '@assets/icons/News.svg';
import password from '@assets/icons/Password.svg';
import PDF from '@assets/icons/PDF.svg';
import phoneMobile from '@assets/icons/Phone_mobile.svg';
import profile from '@assets/icons/Profile.svg';
import profileList from '@assets/icons/Profile_list.svg';
import protection from '@assets/icons/Protection.svg';
import roles from '@assets/icons/Roles.svg';
import schedule from '@assets/icons/Schedule - Line.svg';
import search from '@assets/icons/Search.svg';
import setting from '@assets/icons/Setting.svg';
import settings from '@assets/icons/Settings.svg';
import statusArchive from '@assets/icons/Status Archive.svg';
import statusBlock from '@assets/icons/Status Block.svg';
import statusDone from '@assets/icons/Status Done.svg';
import statusClock from '@assets/icons/Status Clock.svg';
import statusDraft from '@assets/icons/Status Draft.svg';
import statusUser from '@assets/icons/Status User.svg';
import statusWarning from '@assets/icons/Status Warning.svg';
import tabel from '@assets/icons/Tabel.svg';
import tiles from '@assets/icons/tiles.svg';
import time from '@assets/icons/Time.svg';
import transportation from '@assets/icons/Transportation.svg';
import Travel from '@assets/icons/Travel.svg';
import user from '@assets/icons/User.svg';
import userProfileSync from '@assets/icons/user-profile-sync.svg';
import WORD from '@assets/icons/WORD.svg';
import cources from '@assets/icons/Courses.svg';
import documentsEdit from '@assets/icons/documentsEdit.svg';
import uploadWhite from '@assets/icons/uploadWhite.svg';
import lock from '@assets/icons/lock.svg';
import unlock from '@assets/icons/unlock.svg';
import download from '@assets/icons/Download.svg';
import documentCheck from '@assets/icons/DocumentCheck.svg';
import documentDownload from '@assets/icons/documentDownload.svg';
import emptyReport from '@assets/icons/emptyReport.svg';
import birthday from '@assets/icons/birthday.svg';
import addCircleBlue from '@assets/icons/addCircleBlue.svg'
import arrowLeft from '@assets/icons/arrowLeft.svg'

export interface IconProps {
    name: keyof typeof iconsMap;
    className?: string;
    styles?: React.CSSProperties;
}

export const iconsMap = {
    birthday,
    emptyReport,
    adressBook,
    addCircleBlue,
    arrowLeft,
    administration,
    angleDown,
    angleUp,
    applications,
    attachment,
    building,
    add,
    addCompany,
    addPeople,
    addAdressBook,
    closed,
    done,
    further,
    more,
    save,
    unload,
    warning,
    calendar,
    chevronDown,
    chevronLeft,
    chevronRight,
    chevronUp,
    claimArchive,
    close,
    contacts,
    document,
    documentAdd,
    documentSection,
    documentSee,
    checkmark,
    emails,
    extAudit,
    eye,
    eyeSlash,
    favoritesHover,
    favoritesSelected,
    history,
    home,
    stepEdit,
    stepError,
    stepNormal,
    stepSelect,
    image,
    company,
    complex,
    check,
    department,
    division,
    infoEmail,
    infoHove: infoHome,
    infoPhone,
    infoService,
    addCircle,
    agreed,
    archiv,
    deleteIcon,
    edit,
    exit,
    interactionList,
    message,
    messageProfile,
    interactionPassword,
    toWork,
    internalAudit,
    leadership,
    legal,
    list,
    login,
    loop,
    menu,
    module,
    money,
    money1,
    monitoring,
    moreCircle,
    news,
    password,
    PDF,
    phoneMobile,
    profile,
    profileList,
    protection,
    roles,
    schedule,
    search,
    setting,
    settings,
    statusArchive,
    statusBlock,
    statusDone,
    statusClock,
    statusDraft,
    statusUser,
    statusWarning,
    tabel,
    tiles,
    time,
    transportation,
    Travel,
    user,
    userProfileSync,
    WORD,
    cources,
    documentsEdit,
    uploadWhite,
    lock,
    unlock,
    download,
    documentCheck,
    documentDownload,
};

const Icon: React.FC<IconProps> = ({ name, className, styles }) => {
    const Component = iconsMap[name];
    return (
        <IconBase className={className}>
            <Component style={styles} />
        </IconBase>
    );
};

// Exports
export default Icon;

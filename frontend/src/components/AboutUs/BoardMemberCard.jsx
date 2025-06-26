import PropTypes from 'prop-types';

export default function BoardMemberCard({ member }) {
    return (
        <div className="main relative bg-white h-72 w-48 rounded-sm shadow-md p-2 overflow-hidden lg:hover:-translate-y-1 lg:hover:z-30 lg:h-96 lg:w-72">
            {/* Image */}
            <div 
                className="absolute z-0 w-[150px] h-[150px] bg-cover bg-center top-0 left-0 lg:w-[240px] lg:h-[240px]"
                style={{ backgroundImage: `url(${member.profile_pic_url})` }}
            ></div>

            {/* Clipped overlay with content */}
            <div className="absolute z-10 grid grid-cols-1 bottom-1 left-1 right-1">
                <div 
                    className="h-28 bg-gray-800 clip-shape p-2 lg:h-28"
                    style={{ clipPath: 'polygon(0% 90%, 100% 0%, 100% 100%, 0% 100%)' }}
                ></div>

                <div className="relative bg-gray-800 h-28 -mt-1 py-1 pl-4 lg:-mt-1 lg:h-36 lg:py-2">
                    <div className="absolute bottom-6">
                        <p className="text-white font-semibold text-sm lg:text-[17px]">
                            {member.name}
                        </p>
                        <p className="text-gray-200/75 text-nowrap font-semibold text-xs lg:text-base lg:mt-1">
                            {member.role}
                        </p>
                        {member.department && (
                            <p className="text-gray-200/75 text-nowrap text-xs lg:text-sm mb-2">
                                ({member.department})
                            </p>
                        )}
                        <div className="flex flex-row gap-x-1 items-center">
                            <p className="text-gray-200/55 text-xs lg:text-sm">
                                {member.phone1}
                            </p>
                            {member.phone2 && (
                                <>
                                    <div className="bg-gray-200 w-[1px] h-5"></div>
                                    <p className="text-gray-200/55 text-xs lg:text-sm">
                                        {member.phone2}
                                    </p>
                                </>
                            )}
                        </div>
                        <p className="text-gray-200/55 text-xs lg:text-sm">
                            {member.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

BoardMemberCard.propTypes = {
    member: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        department: PropTypes.string,
        phone1: PropTypes.string.isRequired,
        phone2: PropTypes.string,
        email: PropTypes.string.isRequired,
        profile_pic_url: PropTypes.string,
    }).isRequired,
};
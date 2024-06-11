
const SectionTitle = ({ subHeading, Heading }) => {
    return (
        <div>
            <div className="lg:w-[500px] w-[300px] mx-auto py-5 text-center">
                <p className="text-base font-semibold text-orange-500 mb-2">--- {subHeading} ---</p>
                <h3 className="text-3xl uppercase border-y-4 py-4">{Heading}</h3>
            </div>
        </div>
    );
};

export default SectionTitle;
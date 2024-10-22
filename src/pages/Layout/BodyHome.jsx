const BodyHome = ({ children, header, subheader, idName, hirarki = "1", type = "grid" }) => {

    const HeaderElement = ({ heading, children }) => {
        const NameClass = "text-5xl font-bold font-poppins mb-20 "
        switch (heading) {
            case "1":
                return <h1 className={NameClass}>{children}</h1>
                break;
            case "2":
                return <h2 className={NameClass}>{children}</h2>
                break;
            case "3":
                return <h3 className={NameClass}>{children}</h3>
                break;
            case "4":
                return <h4 className={NameClass}>{children}</h4>
                break;
            case "5":
                return <h5 className={NameClass}>{children}</h5>
                break;
        }
    }

    /**
     * 
     * @param {string} typeOf Type of this Element  
     */
    const SubHeaderElement = ({ typeOf, children }) => {
        return (<p className={'text-md font-poppins ' + (typeOf == "space" ? "my-10" : "")}>{children}</p>)
    }

    /**
     * 
     * @param {string} typeOf Type of this element 
     */
    const BodyContainElement = ({ typeOf, children }) => {
        switch (typeOf) {
            case "grid":
                return <div className='grid grid-cols-1 my-20 md:grid-cols-2 gap-8'>
                    {children}
                </div>
                break;
            case "casual":
                return <p className={'font-sm font-poppins'}>{children}</p>
                break
            case "space":
                return <div className={'space-y-4'}>{children}</div>
                break
            default:
                return
                break;
        }
    }

    return (<section id={idName} className='max-w-4xl mx-auto text-center py-10 px-4'>
        <HeaderElement heading={hirarki} typeOf={type}>{header}</HeaderElement>
        <SubHeaderElement typeOf={type}>{subheader}</SubHeaderElement>
        <BodyContainElement typeOf={type}>{children}</BodyContainElement>
    </section>)
}

export default BodyHome
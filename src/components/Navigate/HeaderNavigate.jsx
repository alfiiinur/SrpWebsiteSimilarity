const HeaderNavigate = ({ children }) => {
    return (<section className='max-w-4xl mx-auto text-center py-5'>
        <div className="flex flex-col items-center justify-start">
            <div className="absolute top-0 left-0 right-0 flex justify-center space-x-4 p-4">
                {children}
            </div>
        </div>
    </section>)
}

export default HeaderNavigate
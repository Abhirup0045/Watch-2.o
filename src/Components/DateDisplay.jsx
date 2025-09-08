export default function DateDisplay({formatDate, time, themeColor = 'emerald'}) {
    // Split the date into parts for better styling
    const fullDate = formatDate(time);
    const dateParts = fullDate.split(', ');
    
    return (
        <div className="mt-6 border-t border-slate-700/50 pt-4">
            <div className="flex flex-col items-center">
                <h3 className="text-sm sm:text-lg md:text-xl text-slate-300 tracking-wide font-light">
                    <span className={`text-${themeColor}-400 font-medium`}>{dateParts[0]}</span>
                    <span className="mx-2">•</span>
                    <span>{dateParts.slice(1).join(', ')}</span>
                </h3>
            </div>
        </div>
    )
}
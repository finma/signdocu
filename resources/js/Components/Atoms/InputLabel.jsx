export default function InputLabel({ value, className = '', required=false, children, ...props }) {
    return (
        <label {...props} className={`block text-xs md:text-sm text-gray-500` + className}>
            {value ? value : children}
            {required && (
                <span className="text-red-500 ms-1">*</span>
            )}
        </label>
    );
}

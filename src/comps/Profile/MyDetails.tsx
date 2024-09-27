export default function MyDetails() {
  return (
    <div>
      <h1 className="text-xl mb-6">My Details</h1>
      <form className="flex flex-col gap-4">
        {/* First Name Field */}
        <div className="flex flex-col border border-black p-2">
          <label htmlFor="firstName" className="text-xs text-muted-foreground">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value="John"
            className="outline-none bg-transparent"
          />
        </div>

        {/* Last Name Field */}
        <div className="flex flex-col border border-black p-2">
          <label htmlFor="lastName" className="text-xs text-muted-foreground">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value="Doe"
            className="outline-none bg-transparent"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col border border-black p-2 bg-gray-100">
          <label htmlFor="email" className="text-xs text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            value="johndoe@example.com"
            className="outline-none bg-transparent"
            disabled
          />
        </div>

        {/* Phone Number Field */}
        <div className="flex flex-col border border-black p-2">
          <label htmlFor="phone" className="text-xs text-muted-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value="9876543210"
            className="outline-none bg-transparent"
          />
        </div>

        {/* Birthday Field */}
        <div className="flex flex-col border border-black p-2">
          <label htmlFor="birthday" className="text-xs text-muted-foreground">
            Birthday
          </label>
          <input
            id="birthday"
            type="date"
            value="1990-01-01"
            className="outline-none bg-transparent"
          />
        </div>

        <button className="border border-black text-white uppercase  p-2 bg-black hover:bg-transparent hover:text-black transition-all duration-200 ease-in-out">
          Update my details
        </button>
      </form>
    </div>
  );
}

export function SidebarClass(){
    //making the sidebar and content come side by side 
    return <div className="flex h-screen">
        
        <div className="bg-red-200  h-full transition-all duration-1000 ease-in-out md:w-96 w-0">
            sidebar
        </div>
        <div className="bg-green-200 w-full h-full">
            content 
        </div>
    </div>
}

//h-screen to take up the full hight 
//h-full to take the full height left 
// hidden md:block  - hidden by default but above the md it becomes a block
// cant transition from hidden to block or any visibility 
//transition-all duration-1000 ease-in-out md:w-96 w-2  above md w is 96 and when moving above this breakpoint 
// transition to all properties is applied with ease in out for 1s
const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// Remove the incorrect injection
code = code.replace(/\n\s*<DiscoverSpacesSection \/>/g, '');

// Inject it at the end of the file, right after the closing </section> of Explore Properties
const injectionTarget = `          </div>
        </section>


              </div>
    </div>
  );
}`;

const replacement = `          </div>
        </section>
        
        {/* 6. Discover Spaces Section */}
        <DiscoverSpacesSection />

              </div>
    </div>
  );
}`;

if (code.includes(injectionTarget)) {
  code = code.replace(injectionTarget, replacement);
  fs.writeFileSync('app/page.js', code, 'utf8');
  console.log("Successfully moved Discover Spaces Section.");
} else {
  console.log("Failed to find injection target. Let me find a better target.");
  const alternativeTarget = `          </div>
        </section>`;
  const lastIndex = code.lastIndexOf(alternativeTarget);
  if (lastIndex !== -1) {
     code = code.slice(0, lastIndex + alternativeTarget.length) + '\n        <DiscoverSpacesSection />\n' + code.slice(lastIndex + alternativeTarget.length);
     fs.writeFileSync('app/page.js', code, 'utf8');
     console.log("Successfully moved Discover Spaces Section using alternative target.");
  } else {
     console.log("Failed completely.");
  }
}

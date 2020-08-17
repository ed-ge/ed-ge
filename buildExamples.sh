cp -r ./test/examples/* ./examples
#<script src="https://cdn.jsdelivr.net/gh/ed-ge/ed-ge@latest/free/Base.js"></script>
find ./examples/* -name "*html" -type f | xargs sed -i -e '/jsdelivr/ a <script src="https://cdn.jsdelivr.net/npm/@ed-ge/ed-ge@latest/free/Base.js"></script>'
find ./examples/ -name "*js" -type f | xargs sed -i -e '/^import.*src/d'

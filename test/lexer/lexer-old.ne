line -> object child
child -> "<" "\r\n" object "\r\n" ">" "\r\n"
object -> nameline "\r\n" transforms "\r\n" components "\r\n"
nameline -> name type
transforms -> translate scale rotate
translate -> (x "," y "\r\n") :+
scale -> (x "," y "\r\n") :+
rotate -> (x "\r\n") :+
components -> (component "\r\n") :+
component -> component_name component_pairs
component_name -> name "\r\n"
component_pairs -> (key "=" value):+

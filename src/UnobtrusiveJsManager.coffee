define ["AppContext"], (AppContext)->
    class UJM
        collection = {}

        prefixes = null

        constructor: (defaultPrefixes = ["data"])->
            prefixes = defaultPrefixes

        register: (attributeKey, attributeValue, event, handlerFunction)->
            @ensureExits attributeKey, attributeValue, event
            collection[attributeKey][attributeValue][event].push handlerFunction
            @

        ensureExits: (attributeKey, attributeValue, event)->
            if !collection[attributeKey]?
                collection[attributeKey] = {};
                collection[attributeKey][attributeValue] = {}
                collection[attributeKey][attributeValue][event] = []

            else if !collection[attributeKey][attributeValue]?
                collection[attributeKey][attributeValue] = {}
                collection[attributeKey][attributeValue][event] = []

            else if !collection[attributeKey][attributeValue][event]?
                collection[attributeKey][attributeValue][event] = []

        execute: ()->
            for name, attribute of collection
                for key, attrVal of attribute
                    for eventName, event of attrVal
                        for handler in event
                            for prefix in prefixes
                                $("""[#{prefix}-#{name}="#{key}"]""").on eventName, handler
            return

    AppContext.UJM || new UJM()
            